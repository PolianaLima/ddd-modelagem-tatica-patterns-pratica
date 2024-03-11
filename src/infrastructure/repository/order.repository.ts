import Order from "../../domain/entity/order";
import OrderModel from "../db/sequileze/model/order.model";
import OrderItemModel from "../db/sequileze/model/orderItem.model";

export default class OrderRepository  {
    async create(entity:Order):Promise<void>{
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.costumerId,
            total: entity.total,
            items:entity.items.map((item)=>({
                id: item.id,
                product_id: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        },
            {
                include:[{model:OrderItemModel }]
            }
        );
    }
}