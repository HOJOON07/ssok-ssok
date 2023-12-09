const developer = {
    frontend: {
        framework: {
            react: 'react',
            next: 'next',
            vue: 0
        },
        vanilla: 'vanilla'
    },
    backend: 'backend'
};

const objectSet = (object, key, newValue) => {
    const newObject = { ...object };
    newObject[key] = newValue;
    return newObject;
};

const update = (object, key, modify) => {
    const value = object[key];
    const newValue = modify(value);
    const newObject = objectSet(object, key, newValue);
    return newObject;
};

const dropFirst = arr => {
    const newArr = [...arr];
    newArr.shift();
    return newArr;
};

const nestedUpdate = (object, keys, modify) => {
    if (keys.length === 0) return modify(object);
    const curKey = keys[0];
    const restOfKeys = dropFirst(keys);
    return update(object, curKey, value => {
        return nestedUpdate(value, restOfKeys, modify);
    });
};

const increment = value => {
    const newValue = value + 1;
    return newValue;
};

const keys = ['fronted', 'framework', 'vue'];

const updatedObject = nestedUpdate(developer, keys, increment);

console.log(updatedObject);
