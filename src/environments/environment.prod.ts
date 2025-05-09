export const environment = {
  production: true,
  API_URL: 'https://api.procare.runasp.net', // تغيير هذا الرابط حسب بيئة الإنتاج
  VERSION: '1.0.0',
  APP_NAME: 'ProCare Admin',
  TOKEN_KEY: 'authToken',
  USER_KEY: 'userData',
  DEFAULT_LANGUAGE: 'ar',
  SUPPORTED_LANGUAGES: ['ar', 'en'],
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 50]
  }
};