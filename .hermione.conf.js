module.exports = {
    baseUrl: 'https://shri-homework.usr.yandex-academy.ru/',
    gridUrl: 'http://127.0.0.1:4444/wd/hub',

    screenshotDelay: 1800,
    retry: 2,
    testsPerSession: 1,

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
        'hermione-standalone-runner': true
    }
};

