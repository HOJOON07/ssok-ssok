//245p
function incrementFieidByName(cart, name, field){
    var item = cart[name];
    var value = item[field];
    var newValue = value + 1;
    var newItem = objectSet(item, field, newValue);
    var newCart = objectSet(cart, name, newItem);
    return newCart;
}



//257p
function forEach(array, f){
    for(var i =0; i < array.length; i++){
        var item = array[i];
        f(item);
    }
}
function cookAdEat(food){
    cook(food);
    eat(food);
}
forEach(food, cookAdEat);



//272p
function arraySet(array, idx, value){
    return withArrayCopy(array, function(copy){
        copy[idx] = value;
    })
}
function withArrayCopy(array, modify){
    var copy = array.slice();
    modify(copy);
    return copy;
}


//276p
function tryCatch(f, errorHandler){
    try{
        return f();
    }catch(error){
        return errorHandler(error);
    }
}