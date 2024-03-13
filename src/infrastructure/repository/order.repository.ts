import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_items";
import OrderRepositoryInterface from "../../domain/repository/order-repository";
import OrderModel from "../db/sequileze/model/order.model";
import OrderItemModel from "../db/sequileze/model/orderItem.model";

export default class OrderRepository implements OrderRepositoryInterface{

    async create(entity:Order):Promise<void>{
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
    }

    async update(entity: Order): Promise<void> {
        const orderModelExistente = await OrderModel.findByPk(entity.id, {  include: ["items"] });

        console.log("Log dentro do update aobuscar antes de atualizar");
        console.log(orderModelExistente.toJSON().items);
        
        await orderModelExistente.update({
            customer_id: entity.costumerId,
            items:entity.items.map((item)=>({
                id: item.id,
                product_id: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: entity.total()
            },
            
        );

        console.log("Log dentro do update");
        
        console.log(entity);
    
    }


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
        const orderModels = await OrderModel.findAll();
        console.log("Log dentro do findAll");
        console.log(orderModels);

        return orderModels.map((orderModel) => 
            new Order(
                orderModel.id,
                orderModel.customer_id, 
                orderModel.items.map((item) => 
                new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)),               
                )
            );
    }

}