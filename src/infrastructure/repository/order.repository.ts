import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_items";
import OrderRepositoryInterface from "../../domain/repository/order-repository";
import OrderModel from "../db/sequileze/model/order.model";
import OrderItemModel from "../db/sequileze/model/orderItem.model";

export default class OrderRepository implements OrderRepositoryInterface{

    async create(entity:Order):Promise<void>{
        try{
            await OrderModel.create({
                id: entity.id,
                customer_id: entity.costumerId,
                total: entity.total(),
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
        }catch(error){
            console.log(error);
        }
    }

    async update(entity: Order): Promise<void> {
        const sequelze = OrderModel.sequelize;
        await sequelze.transaction(async (t) => {

            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
            });

            const items = entity.items.map((item) => ({
                id: item.id,
                product_id: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                order_id: entity.id,
            }));
            await OrderItemModel.bulkCreate(items, { transaction: t });
            await OrderModel.update(
                { 
                    total: entity.total(),
                    customer_id: entity.costumerId
                },
                { where: { id: entity.id }, transaction: t }
            );
        })
    };
    


    async findById(id: string): Promise<Order> {

        const orderModel = await OrderModel.findOne({
            where: { id },
            include: ["items"],
        });

    return new Order(
                    orderModel.id,
                    orderModel.customer_id, 
                    orderModel.items.map((item) => 
                    new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)),               
                    );
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: [{ model: OrderItemModel }]
        });
    
        return orderModels.map(orderModel =>
            new Order(
                orderModel.id,
                orderModel.customer_id,
                orderModel.items.map((item) =>
                    new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)),
            )
        );
    }

}