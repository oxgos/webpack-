// 定义模块
define('common', function() {
    return {
        initIndex: function() {
            console.log($('document'));
            console.log('common index init');
        },
        initCart: function() {
            console.log($('document'));
            console.log('common cart init');
        }
    }
})