const { google } = require('googleapis');

async function appendData() {
  try {
    // 1. Авторизация через секреты GitHub
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    // 2. Данные, которые мы запишем для теста
    const values = [[
      new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' }), 
      "Тест из GitHub Actions", 
      "Связь установлена успешно! ✅"
    ]];
    
    // 3. Отправка в таблицу
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:C', // Убедитесь, что лист в таблице называется Sheet1 или измените на свой
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    console.log('✅ Данные успешно добавлены в таблицу!');
  } catch (error) {
    console.error('❌ Ошибка при работе с таблицей:', error.message);
    process.exit(1); // Сообщаем GitHub Actions, что произошла ошибка
  }
}

appendData();
