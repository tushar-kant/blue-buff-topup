type OrderType = {
  gameSlug: string;
  itemSlug: string;
  itemName: string;
  playerId: string;
  zoneId: string;
  paymentMethod: string;
  price: number;
  status: string;
  createdAt: string;
};

interface OrderItemProps {
  order: OrderType;
}

export default function OrderItem({ order }: OrderItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <div className="p-5 bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow">
      <div className="flex justify-between mb-2">
        <p className="text-xs text-[var(--muted)]">
          {new Date(order.createdAt).toLocaleString()}
        </p>
        <span className={`font-semibold ${getStatusColor(order.status)}`}>
          {order.status.toUpperCase()}
        </span>
      </div>

      <div className="flex justify-between text-sm">
        <p><strong>Player ID:</strong> {order.playerId}</p>
        <p><strong>Zone ID:</strong> {order.zoneId}</p>
      </div>

      <div className="flex justify-between mt-2 text-sm">
        <p><strong>Payment:</strong> {order.paymentMethod}</p>
        <p><strong>Price:</strong> ₹{order.price}</p>
      </div>

      <p className="mt-3 text-sm text-[var(--muted)]">
        {order.gameSlug} — {order.itemSlug} — {order.itemName}
      </p>
    </div>
  );
}