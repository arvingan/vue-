window.randomNum = function(minNum, maxNum) {
	switch(arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}
window.getBase64Image= function(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}
window.downloadCanvasIamge= function(id, name) {
    // 通过选择器获取canvas元素
    var canvas = document.getElementById(id);
    // 使用toDataURL方法将图像转换被base64编码的URL字符串
    var url = canvas.toDataURL('image/png')
    // 生成一个a元素
    var a = document.createElement('a')
    // 创建一个单击事件
    var event = new MouseEvent('click')
    
    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
    a.download = name || '下载图片名称'
    // 将生成的URL设置为a.href属性
    a.href = url
    
    // 触发a的单击事件
    a.dispatchEvent(event)
}

