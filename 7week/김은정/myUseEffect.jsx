function myUseEffect(callback, dependencies) {
  if (dependencies.length === 0) {
    callback();
  }

  const hasChanged = dependencies.some(
    (dep, index) => dep !== prevDependencies[index]
  );

  if (hasChanged) {
    callback();
  }

  prevDependencies = dependencies;
}

let prevDependencies = [];

// EX
myUseEffect(() => {
  console.log("컴포넌트가 마운트될 때만 실행됩니다.");
}, []);
