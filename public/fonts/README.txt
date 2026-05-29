Скачать Inter шрифт локально:
1. https://fonts.google.com/specimen/Inter → Download family
2. Распаковать и скопировать файлы .woff2 в эту папку:
   - Inter-Regular.woff2
   - Inter-Medium.woff2
   - Inter-SemiBold.woff2
   - Inter-Bold.woff2
3. Обновить app/globals.css:
   @font-face {
     font-family: 'Inter';
     src: url('/fonts/Inter-Regular.woff2') format('woff2');
     font-weight: 400;
   }
   ... и т.д.
