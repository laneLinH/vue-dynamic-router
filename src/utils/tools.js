import moment from 'moment'

export function randomCode(len){
  len = len || 4;
  var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

export function $dealTableDate(mod=[],obj={},format=''){
  for(let k in obj){
    for(let mo of mod){
      if(mo===k && obj[k]){
        obj[k]=moment(new Date(parseInt(obj[k]))).format(format)
      }
    }
  }
  return obj
}


export const $typeOf=(obj) => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}


export const $deepClone=(data)=>{
  var type = $typeOf(data);
  var obj;
  if(type === 'array'){
    obj = [];
  } else if(type === 'object'){
    obj = {};
  } else {
    return data;
  }
  if(type === 'array'){
    for(var i = 0, len = data.length; i < len; i++){
      obj.push($deepClone(data[i]));
    }
  } else if(type === 'object'){
    for(var key in data){
      obj[key] = $deepClone(data[key]);
    }
  }
  return obj;
}

export const $formatDate=(string,formatstr)=>{
  return moment(string).format(formatstr)
}


// 身份证
export function checkIdNum(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    return callback(new Error('证件号码不能为空'))
  } else if (!reg.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else {
    callback()
  }
}

// 整数
export function checkInterNum(rule, value, callback) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  if (!value) {
    return callback(new Error('请填写整数'))
  } else if (!reg.test(value)) {
    return callback(new Error('请输入整数'))
  } else {
    callback()
  }
}



export function getImgToBase64(url,callback){
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image;
  img.crossOrigin = 'Anonymous';
  img.onload = function(){
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img,0,0);
    var dataURL = canvas.toDataURL('image/png');
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
  //return new Blob([u8arr],{type:mime});
}


export function contactObj(newObj,oldObj){
  let news=Object.keys(newObj)
  let olds=Object.keys(oldObj)
  let newPro=news.filter(m=>!olds.includes(m))
  for(let ol of olds){
    oldObj[ol]=newObj[ol]
  }
  for(let ol of newPro){
    oldObj[ol]=newObj[ol]
  }
  return oldObj
}

export function print(printStyle,printDom){
  let printStr = '<html><head><style>'+printStyle+'</style></head><body>';
  let content = "";
  let str = printDom.innerHTML;
  content = content + str;
  printStr = printStr+content+"</body></html>";
  let newWindow=window.open("打印窗口","_blank");
  newWindow.document.write(printStr);
  newWindow.document.close();
  newWindow.print();
  newWindow.close();
}



