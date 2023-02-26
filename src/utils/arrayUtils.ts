type Item = {
    id: string
}

// TItem extends Item ==> interface extends Item{}; 
// 为什么要用interface，因为Item必须全部匹配，不多不少，而interface只要满足就可以。
export const findItemIndexById = <TItem extends Item>(items: TItem[], id: string) => {
    return items.findIndex((item: TItem) => item.id === id)
}