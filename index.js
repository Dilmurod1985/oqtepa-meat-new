const { google } = require('googleapis');

async function appendToSheet(orderData) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    // Данные распределяем точно по вашим заголовкам
    const values = [[
      new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' }), // Дата и Время
      orderData.brigadier || 'Дилмурат',                                // Имя бригадира
      orderData.workshop || 'Цех №1',                                   // Цех
      orderData.product || 'Тестовый набор Meat',                       // Товар
      orderData.quantity || '50000',                                    // Количество (шт)
      orderData.productId || 'ID-001'                                   // ID товара
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F', // Заполняем колонки от A до F
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    console.log('✅ Данные успешно добавлены в горизонтальную таблицу!');
  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

// Имитация данных, которые будут приходить из системы
const currentOrder = {
  brigadier: "Дилмурат",
  workshop: "Основной цех",
  product: "Говядина Premium",
  quantity: 150,
  productId: "MEAT-99"
};

appendToSheet(currentOrder);
