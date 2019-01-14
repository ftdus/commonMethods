.modal_open {
  position: fixed;
  height: 100%;
}

var ModalHelper = (function(bodyClass) {
    var scrollTop;
    return {
        //弹框打开之后调用
        afterOpen: function() {
            scrollTop = document.scrollingElement.scrollTop  ||
                        document.documentElement.scrollTop || 
                        document.body.scrollTop;
            document.body.classList.add(bodyClass);
            document.body.style.top = -scrollTop + 'px';
        },
        //弹框关闭之前调用
        beforeClose: function() {
            document.body.classList.remove(bodyClass);
            document.scrollingElement.scrollTop = document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
        }
    };
})(要添加的类名/modal_open);
