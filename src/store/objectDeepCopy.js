export const objectDeepCopy=(updatingObject,updatedProperties)=>{
    return {
        ...updatingObject,
        ...updatedProperties
    }
}