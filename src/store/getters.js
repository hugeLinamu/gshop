export default {
    totalPrice( state ){
        return state.cartFoods.reduce( (prePrice , food)=>  prePrice + food.count * food.price  ,0 )
    },
    totalCount( state ){
        return state.cartFoods.reduce( (prePrice , food)=> prePrice + food.count ,0 )
    }
}