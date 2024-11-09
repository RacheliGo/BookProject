
const sql = require('mssql');

const dbConfig = {
    user: 'ddbad',             
    password: 'ƒ‰ƒ‰',   
    server: 'localhost',       
    database: 'LibraryProject', 
    options: {
        encrypt: false,           
        trustServerCertificate: true 
    }
};

// התחברות למסד הנתונים
async function connectToDB() {
    try {
        await sql.connect(dbConfig);
        console.log("Connected to SQL Server database");
    } catch (err) {
        console.error("Error connecting to SQL Server:", err);
    }
}

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("מחובר למסד נתונים SQL Server");
        return pool;
    })
    .catch(err => {
        console.error("שגיאה בחיבור למסד הנתונים SQL Server:", err);
    });

module.exports = {
    sql,
    poolPromise // ודא ש- poolPromise מיוצא כאן
};

// בדיקה אם החיבור עובד
async function testConnection() {
    try {
        
        console.log("חיבור למסד הנתונים עובד!");
    } catch (err) {
        console.error("שגיאה בחיבור למסד הנתונים:", err);
    }
}

// הפעלת פונקציית בדיקת החיבור
testConnection();


module.exports = {
    sql,
    connectToDB
};
