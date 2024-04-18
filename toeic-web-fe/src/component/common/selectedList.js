export const updateSelectedList = (setCheckedItems, itemId) => {
    setCheckedItems(prevState => ({
        ...prevState,
        [itemId]: !prevState[itemId]
    }));
}
export const getValueCheck = (checkedItems) => {
    const selected = [];
    for (const key in checkedItems) {
        if (checkedItems[key] === true) {
            selected.push(key);
        }
    }
    return selected;
}
