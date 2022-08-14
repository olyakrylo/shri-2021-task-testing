module.exports = {
    baseUrl: 'https://shri-homework.usr.yandex-academy.ru/',
    gridUrl: 'http://192.168.0.104:4444/wd/hub',

    screenshotDelay: 2000,
    retry: 2,

    windowSize: {
      width: 1200,
      height: 800
    },

    sets: {
        desktop: {
            files: 'test/hermione'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            },
            testTimeout: 300000,
        }
    },

    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-reporter'
        },
    }
};

