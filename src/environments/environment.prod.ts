export const environment = {
    production: true,
    firebaseConfig: {
        apiKey: process.env.ABS_FIREBASE_API_KEY,
        authDomain: process.env.ABS_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.ABS_FIREBASE_DATABASE_URL,
        projectId: process.env.ABS_PROJECT_ID,
        storageBucket: process.env.ABS_STORAGE_BUCKET,
        messagingSenderId: process.env.ABS_MESSAGING_SENDER_ID,
        appId: process.env.ABS_APP_ID,
        measurementId: process.env.ABS_MEASUREMENT_ID,
    },
};
