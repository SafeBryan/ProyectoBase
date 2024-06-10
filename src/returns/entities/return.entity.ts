import { OrderItem } from "src/order_items/entities/order_item.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Return {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    cantidad: number;

    @Column()
    fecha: Date;

    @Column()
    motivo: string;

    
  @ManyToOne(() => OrderItem, (order_Item) => order_Item.returns, {
    eager: true,
  })
  orderItem: OrderItem;






}
