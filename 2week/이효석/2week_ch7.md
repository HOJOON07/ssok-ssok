# CH7

#### 문제 1

```js
function payrollCalc(employees) {
  // 기능 수행
  return payrollChecks;
}

// 풀이
function payrollCalcSafe(employees) {
  const copy_employees = deeplyCopy(employees);
  const payrollChecks = payrollCalc(copy_employees);
  return payrollChecks;
}
```

#### 문제 2

```js
userChanges.subscribe(function (user) {
  processUser(user);
});

// 풀이
userChanges.subscribe(function (user) {
  const copy_user = deeplyCopy(user);
  processUser(copy_user);
});
```

# 깊은 복사를 위한 Lodash 사용하기

```js
// 얕은 복사
const array_sc = ["사과", "포도", "바나나"];
const temp_sc = {
  name: "",
};

temp_sc.name = "망고";
array_sc.push(temp_sc);
temp_sc.name = "딸기";
array_sc.push(temp_sc);

console.log("얕은 복사(Swallow Copy) : ", array_sc);

// 깊은 복사
const _ = require("lodash");
var array_dc = ["사과", "포도", "바나나"];
var temp_dc = {
  name: "",
};

temp_dc.name = "망고";
array_dc.push(_.cloneDeep(temp_dc));
temp_dc.name = "딸기";
array_dc.push(_.cloneDeep(temp_dc));

console.log("깊은 복사(Deeply copy) : ", array_dc);
```
