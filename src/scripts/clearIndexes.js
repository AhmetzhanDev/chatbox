const mongoose = require('mongoose');
const config = require('../config/config');

async function clearIndexes() {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('Подключено к MongoDB');

    const collections = await mongoose.connection.db.collections();
    
    for (let collection of collections) {
      await collection.dropIndexes();
      console.log(`Индексы удалены из коллекции ${collection.collectionName}`);
    }

    console.log('Все индексы успешно удалены');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка:', error);
    process.exit(1);
  }
}

clearIndexes(); 