//Binding
export function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      //Binds this to all incoming methods
      const boundFn = originalMethod.bind(this)
      return boundFn;
    }
  };
  return adjDescriptor;
}
