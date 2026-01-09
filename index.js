const { google } = require('googleapis');

// Функция для записи данных (твоя основная логика)
async function appendToSheet(orderData) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    // Формируем строку из данных заказа (имя, телефон, заказ и т.д.)
    const values = [[
      new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' }),
      orderData.name || 'Не указано',
      orderData.phone || 'Не указано',
      orderData.orderItems || 'Пусто',
      orderData.totalPrice || '0'
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E', // Теперь захватываем больше колонок
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    console.log('✅ Заказ успешно записан в таблицу!');
  } catch (error) {
    console.error('❌ Ошибка записи:', error);
  }
}

// ДЛЯ ПРОВЕРКИ: Имитируем приход данных (потом это будет приходить с сайта)
const testOrder = {
  name: "Дилмурат",
  phone: "+998999771485",
  orderItems: "Тестовый набор Meat",
  totalPrice: "50000"
};

appendToSheet(testOrder);
