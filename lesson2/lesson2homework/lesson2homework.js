
window.onload = function () {
    var wrap = document.getElementById('wrapper'),
        xhr = new XMLHttpRequest(),
        url = 'https://jsvars-creemer.c9users.io/Geekbrains/img.json';
        
        //Асинхронная часть запроса
        xhr.onreadystatechange = function () {
            //Проверки на возврат запроса, и на статус
            if( xhr.readyState != 4 ) return;
            if( xhr.status != 200 )  return alert( 'ERROR: ' + xhr.status+ ' : ' + xhr.statusText );
            
            //Парсим получнный JSON файл
            var images = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            
            //Создаём новые изображение, и всталяем в них ссылки с полученного файла
            for( var i in images ) {
                console.log( images[i] );
                var img = document.createElement( 'img' );
                img.src = images[i];
                img.classList.add( 'image' );
                wrap.appendChild( img );
            }
        };
        xhr.open( 'GET', url, true );
        xhr.send( null );  
    
    //Ждём клика по родителю изображений    
    wrap.addEventListener( 'click', function(){openInNewWindow(event) });
    
};

function openInNewWindow(event) {
    //Создаём картинку
    var img = new Image();
    img.src = event.target.src;
    
    //Открываем новое окно
    var w = window.open( '','Image', 'left=100,top=100,width='+ img.width +',height='+ img.height +'' );
    var doc = w.document;
    
    //Создаём кнопку закрытия окна
    var exit = doc.createElement( 'div' );
    
    exit.style.position = 'fixed';
    exit.style.right = '0';
    exit.style.top = '0';
    exit.style.color = 'white';
    exit.style.fontSize = '60px';
    exit.style.background = 'rgba(0,0,0,0.8)';
    exit.style.cursor = 'pointer';
    exit.innerHTML = '&#215;';
    exit.setAttribute( 'onclick', 'window.close()' );
    
    
    //Вставляем на страницу созданные эелементы
    doc.body.appendChild( img );
    doc.body.appendChild( exit );
}
