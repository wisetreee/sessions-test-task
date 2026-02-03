Приложение для анализа сессий

## Обзор архитектуры

Приложение организовано с четким разделением ответственности:

- **Слой API**: Хуки TanStack Query для загрузки данных
- **Управление состоянием**: Хранилища Zustand для состояния UI (фильтры, сортировка, позиция скролла)
- **Типы**: TypeScript интерфейсы для API ответов и состояния приложения
- **Утилиты**: Расчет severity, алгоритмы кластеризации, нормализация данных
- **Компоненты**: Переиспользуемые UI компоненты, организованные по функциональности
- **Экраны**: Файловая маршрутизация Expo Router

## Детали реализации

### 1. Слой API (`api/`)

**`api/client.ts`**: HTTP клиент на базе fetch с обработкой ошибок для нестабильного API

- Base URL из `EXPO_PUBLIC_API_URL` env переменной (по умолчанию: `http://81.163.27.191:8000`)
- Логика повторных попыток для неудачных запросов
- Обработка таймаутов

Функции API эндпоинтов

- `getSessionList(page, limit)`: Загрузка сессий с пагинацией
- `getSessionDetails(id)`: Загрузка деталей сессии

Хуки TanStack Query

- `useSessionList(page, limit)`: Query хук для списка сессий
- `useSessionDetails(id)`: Query хук для деталей сессии
- Правильная обработка ошибок и конфигурация повторных попыток

### 2. Типы (`types/`)

**`types/session.ts`**: Типы, связанные с сессиями

- `SessionListItem`: Тип элемента списка (может иметь отсутствующие поля)
- `SessionDetails`: Полные детали сессии
- `SessionStats`: Объект статистики (может быть частичным)
- `SessionFlags`: Объект флагов

**`types/event.ts`**: Типы событий

- `Event`: Базовый тип события
- `EventType`: Union всех типов событий
- `EventCategory`: Navigation, UI, Network, Errors, Performance, Unknown

**`types/api.ts`**: Типы API ответов

- `PaginatedResponse<T>`
- Обработка optional/nullable полей для несогласованных данных

### 3. Расчет Severity (`utils/severity.ts`)

Формула: `severity = baseScore + errorScore + requestScore + clickScore + corruptionPenalty`

- **baseScore**: 0
- **errorScore**: `log(jsErrors + 1) * 10 + log(consoleErrors + 1) * 5`
- **requestScore**: `log(failedRequests + 1) * 8 + log(pendingRequests + 1) * 6`
- **clickScore**: `log(rageClicks + 1) * 3 + log(deadClicks + 1) * 2`
- **corruptionPenalty**: `flags.corrupted ? 50 : 0`

Свойства:

- Монотонность: увеличение любого счетчика увеличивает severity
- Логарифмическое масштабирование предотвращает доминирование выбросов
- Corruption добавляет значительный штраф

### 4. Экран списка сессий (`app/(tabs)/index.tsx`)

**Функции:**

- Пагинация с использованием `useInfiniteQuery` от TanStack Query
- Фильтры (клиентская фильтрация загруженных данных):
  - Булевы фильтры: jsErrors > 0, failedRequests > 0, pendingRequests > 0, rageClicks > 0, deadClicks > 0, flags.corrupted
  - Текстовый фильтр: entryUrl/lastRoute (подстрока или regex)
- Сортировка: по `startedAt` (время) или `severity` (рассчитанная)
- Zustand хранилище сохраняет: текущую страницу, фильтры, сортировку, позицию скролла
- Карточки сессий отображают: id, длительность, входной/последний маршрут, ключевые счетчики, индикатор corruption

**Управление состоянием (`stores/session-list-store.ts`):**

- Состояние фильтров
- Состояние сортировки
- Позиция скролла (используя refs)
- Текущая страница

**`stores/index.ts`**: Реэкспорт всех хранилищ для более чистых импортов

### 5. Экран деталей сессии (`app/session/[id].tsx`)

**Timeline View:**

- События сгруппированы по категориям (дорожки):
  - Navigation: `nav.*`
  - UI: `ui.*`
  - Network: `net.*`
  - Errors: `error.*`, `console.*`
  - Performance: `perf.*`
  - Unknown: всё остальное
- События отсортированы по `ts`, стабильная сортировка для одинаковых timestamps
- Визуальный таймлайн с горизонтальными дорожками

**Фильтры:**

- Включение/выключение категорий
- Кнопки "Перейти к следующему":
  - Следующая ошибка
  - Следующий неудачный запрос
  - Следующий pending запрос
- Работает только с отфильтрованными/видимыми событиями

**Обработка Pending запросов (`utils/data-normalization.ts`):**

- Сопоставление запросов с ответами по `requestId`
- Определение orphaned запросов (без ответа)
- Определение orphaned ответов (без запроса)
- Четкое отображение аномалий

**Панель деталей события:**

- Отображение ключевых полей
- Просмотр raw JSON (сворачиваемый, прокручиваемый)
- Корректная обработка больших/вложенных данных

**Управление состоянием (`stores/session-detail-store.ts`):**

- Включенные категории
- Выбранное событие
- Текущая позиция скролла

### 6. Кластеризация похожих сессий (`components/clustering/SessionDiff/SessionDiff.tsx`)

**Алгоритм (`utils/clustering.ts`):**

- Представление сессии как последовательности типов событий: `["nav.start", "ui.click", "net.request", ...]`
- Использование Longest Common Subsequence (LCS) для определения схожести
- Расчет коэффициента схожести: `2 * LCS_length / (len_A + len_B)`
- Поиск топ N похожих сессий из загруженных данных

**Визуализация различий (components/clustering/SessionDiff/SessionDiff.tsx):**

- Сравнение side-by-side
- Отображение совпадающих событий с выравниванием
- Подсветка различий

### 7. Проблемы

- Имеются проблемы с переключением на следующий запрос 
- Модалки деталей собюытия пока не переведены 

### 8. Экраны

**Главный экран:**

<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/0fe74b14-923d-4f25-af67-10747eef1829" />
<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/51d90ff2-e22d-4f8f-95a0-e7067fa2645c" />

**Экран сессии:**

<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/24db2e72-2119-4673-b07b-b1761964cfd0" />
<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/da912678-05ab-4163-af1c-d9b8e130fb31" />

**Детали события:**

<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/a9f4aa82-ef77-4f22-a84a-4d529f9631d8" />
<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/8f90caa8-365f-4b04-810c-8d12fac99a66" />



