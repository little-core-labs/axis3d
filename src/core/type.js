export const NamedType = (Type, typeName = Type.name) => {
  return Object.assign((class extends Type {}), {typeName})
}
