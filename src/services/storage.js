export default class Storage {

  constructor(ttl) {
    this.ttl = ttl
    this.isBrowserSupport = this.checkSupport()
  }

  checkSupport = () => {
    try {
      localStorage.setItem('checkSupport', 'hello world');
      localStorage.removeItem('checkSupport');
      return true;
    } catch (exception) {
      return false;
    }
  }
    

  getItem = item => {
    if (!this.isBrowserSupport) return false;

    let data = sessionStorage.getItem(item);

    if (data) {
      return data;
    }

    data = JSON.parse(localStorage.getItem(item));

    if (!data) return null;

    if (!data.timestamp) return data.value;

    if (data && new Date().getTime() < data.timestamp) {
      return data.value;
    }

    this.removeItem(item);
  };

  setItem = (item, value, ttl) => {
    if (!this.isBrowserSupport) return false;
    const currentTTL = ttl ? ttl : this.ttl; 

    try {
      if (currentTTL === 0) {
        sessionStorage.setItem(item, value);
        if (localStorage.getItem(item)) {
          localStorage.removeItem(item);
        }
        return true;
      }

      const ttlMilliSec = ttl * 60 * 1000;
      const data = { value, timestamp: new Date().getTime() + ttlMilliSec };
      localStorage.setItem(item, JSON.stringify(data));
      return true;
    } catch (exception) {
      if (exception.name === 'QuotaExceededError') {
        this.clearStorageWhenFull()
        console.log('Clear local storage')
        return 
      }
      console.error(exception);
    }
  };

  removeItem = item => {
    if (!this.isBrowserSupport) return;
    localStorage.removeItem(item);
  };

  clearStorageWhenFull = () => {
    try {
      for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) continue;
        if (!JSON.parse(localStorage.getItem(key)).timestamp) continue;

        this.removeItem(key)
      }
    } catch (error) {
      // Do nothing
    }
  }
}