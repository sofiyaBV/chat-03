Comparison = // Це назва для обчисленого стовпця або міри.

VAR CurrentYearValue = // Створюємо змінну CurrentYearValue для зберігання суми прибутку ('Profit') для поточного року.

    CALCULATE(
        SUM('financials'[Profit]),  // Обчислюємо суму прибутку ('Profit') з таблиці 'financials'.

        FILTER(  // Застосовуємо фільтр, щоб вибрати тільки ті рядки, де рік у колонці 'Date' з таблиці 'financials' співпадає з поточним роком, витягнутим за допомогою LASTDATE() з таблиці календаря 'Calendar'.
            'financials',
            YEAR('financials'[Date]) = YEAR(LASTDATE('Calendar'[Date]))
        )
    )

VAR PreviousYearValue = // Створюємо змінну PreviousYearValue для зберігання суми прибутку ('Profit') для попереднього року.

    CALCULATE(
        SUM('financials'[Profit]),  // Обчислюємо суму прибутку ('Profit') з таблиці 'financials'.

        SAMEPERIODLASTYEAR('Calendar'[Date])  // Застосовуємо функцію SAMEPERIODLASTYEAR(), щоб отримати дані за аналогічний період попереднього року, використовуючи стовпець дати з таблиці календаря 'Calendar'.
    )

RETURN // Повертаємо результат порівняння.

    DIVIDE(CurrentYearValue - PreviousYearValue, PreviousYearValue, 0)  // Рахуємо відсоткове змінення між поточним та попереднім роком, використовуючи функцію DIVIDE(). Якщо попередній рік має значення 0, встановлюємо результат на 0, щоб уникнути ділення на нуль.
