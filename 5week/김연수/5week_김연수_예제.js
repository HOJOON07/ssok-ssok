//p.321
// 원래코드
reduce(customer, purchases,{total : 0},
    function(biggestSoFar, purchases){
        if(biggestSoFar.total > purchases.total)
            return biggestSoFar;
        else
            return purchases;
    });
//콜백으로 분리
mawKey(customer.purchases, {total:0},
    function (purchases){return purchases.total;}
    );

    function mawKey(array, init, f){
        return reduce(array,
            init,
            function(biggestSoFar, element){
                if(f(biggestSoFar)>f(element)){
                    return biggestSoFar;
                } //이부분 책에서 오타 같습니다 (닫힌 괄호 없음)
                else
                    return element;
                
            })
    }



//새롬게 안 용어 : 항등함수
//고차함수를 그대로 쓰는방법보다 이름을 붙인 방법(콜백)이 재사용하기 좋음
// stream 결합 :  Map, filter, reduce 체인을 최적화 하는것 
// ex) map사용을 최소한으로
// 다른 함수형 도구 : 
    // pluck(): 콜백 작성 도와줌
    // concat() : 배열안에 배열을 뺼 수 있음 , 중첩된 배열을 한단계의 배열로  
    // frequenciesBy() , groupBy() : 객체 또는 맵 반환

//p.374
//imcrementSizeByName()을 만드는 네가지 방법

function imcrementSizeByName(cart, name){
    return update(cart, name , incrementSize);
}

function imcrementSizeByName(cart, name){
    return update(cart, name , function(item){
        return update2(item, 'option', 'size', function(size){
            return size + 1;
        })
    });
}

function imcrementSizeByName(cart, name){
    return update(cart, name , function(item){
        return update(item, 'option', function(options){
            return update(options,'size', function(size){
                return size + 1;
            })
        })
    });
}

// 리팩토링을 이렇게까지 빼야할까 라는 의문이 들었다 . 경험으로 생각하면 좋을것같다는 생각 :)


