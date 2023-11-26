## 함수형 코딩

## map함수 도출하기

```javascript
function emailForCustomers(customers , goods, bests) {
    return map (customers, function(customer){
        return emailForCustomer (customer , goods , bests);
    })
}
```

#### 익명 함수
필요한 곳에 바로 정의함
함수를 변수같은곳에 넣지 않기 때문에 이름이 없음

### map 연습문제
```javascript
map(customers, function(customer){
    return{
        firstName : customer.firstName,
        lastName : customer.lastName,
        addName : customer.address,
    }
})
```
### filter 연습문제
```javascript
function testGroup = filter (customers, function(customer)){
    return (
        customer.id % 3 === 0;
    )
}
function nonTestGroup = filter (customers, function(customer)){
    return (
        customer.id % 3 !== 0;
    )
}
```
### reduce 연습문제
```javascript
function sum (numbers){
    return reduce (numbers, 0, function(total, num){
        return total + num;
    })
}
function product (numbers){
    return reduce (numbers, 0, function(total, num){
        return total * num;
    })
}
```


## max , maxkey 함수 도출하기

```javascript
function maxKey (array, int, f){
    return reduce (array, init, function(biggestSoFar, element){
        if (f(biggestSoFar) > f(element))
            return biggestSoFar;
        else
            return element;
    });
}
function max (array, init){
    return maxKey (array, init, function(x){
        return x;
    })
}
```

#### 예제
```javascript
function bigSpenders (customers){
    var withBigPurchases = filter(customers, hasBigPurchase);
    var with20rMorPurchases = filter(withBigPurchases, has20rMorPurchases);
     return with20rMorPurchases;
}
function hasBigPurchase(customer){
    return filter(customer.purchases, isBigPurchases).length > 0;
}
function isBigPurchases(customer){
    return purchases.total > 100;
}
function has20rMorPurchases(customer){
    return customer.purchases.length >= 2;
}

```

## 중첩된 데이터에 함수형 사용

#### 리팩토링 전

```javascript
function incrememtField (item, field){
    var value = item(field);
    var newvalue = value + 1;
    var newItem - objectSet(item , field, newValue);
     return newItem;
}
```
#### 리팩토링 후

```javascript
function incrememtField (item, field){
    return update(item , field, function(value){
        return value + 1;
    });
}
```