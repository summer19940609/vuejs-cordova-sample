export const nativeAlert = (message, title) => {
    if (navigator.notification) {
        navigator.notification.alert(message, () => { }, title, 'Ok');
    } else {
        alert(message);
    }
};

export const judegeTopicMiscVar = (type) => {
    var topic_misc = topicMiscVar.unpack('AQAAACE')

    if (topic_misc._STID)
        alert('标题的所在的主题集合ID是' + topic_misc._STID)

    if (topic_misc._BIT1) {
        if (topic_misc._BIT1 & topicMiscVar._FONT_RED)
            alert('标题字体是红色')
        if (topic_misc._BIT1 & topicMiscVar._FONT_B)
            alert('标题字体是粗体')
    }
}

// NGA主题贴颜色
const topicMiscVar = {
    _BIT1: 1,
    _STID: 2,

    _FONT_RED: 1,
    _FONT_BLUE: 2,
    _FONT_GREEN: 4,
    _FONT_ORANGE: 8,
    _FONT_SILVER: 16,
    _FONT_B: 32,
    _FONT_I: 64,
    _FONT_U: 128,

    unpack: function (x) {
        if (x.match(/~1?$/))
            return;
        var z = {}, x = this.b642bin(x), i = 0, y;
        if (x === '')
            return z;
        while (y = this.bin2UInt(x.substr(i, 1))) {
            if (y == this._BIT1) {
                z._BIT1 = this.bin2UInt(x.substr(i + 1, 4));
                i += 5;
            }
            else if (y == this._STID) {
                z._STID = this.bin2UInt(x.substr(i + 1, 4));
                i += 5;
            }
        }
        return z;
    },//fe
    bin2UInt: function (x) {//二进制字符串转为多字节整数(big-endian)
        var z = 0, y = 0
        for (var i = 0; i < x.length; i++) {
            y = x.charCodeAt(i)
            z = (z << (y > 255 ? 16 : 8)) + y//如果输入字符串中有utf16字符则一次移动两字节
        }
        return z
    },//fe
    b642bin: function (s) {//base64解码 如字符串中有多字节字符，解码会变为多个ascii字符
        var e = {}, i, b = 0, c, x, l = 0, a, r = '', w = String.fromCharCode, L = s.length;
        if (L % 4 == 3) { s += '='; L += 1; }
        else if (L % 4 == 2) { s += '=='; L += 2; }
        var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (i = 0; i < 64; i++) { e[A.charAt(i)] = i; }
        for (x = 0; x < L; x++) {
            c = e[s.charAt(x)]; b = (b << 6) + c; l += 6;
            while (l >= 8) { ((a = (b >>> (l -= 8)) & 0xff) || (x < (L - 2))) && (r += w(a)); }
        }
        return r;
    }//fe
}


