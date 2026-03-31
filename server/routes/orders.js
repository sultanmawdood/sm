import express from 'express';

const router = express.Router();

// Mock orders database
const orders = [];

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Create new order
router.post('/', (req, res) => {
  try {
    const { items, total, customerInfo } = req.body;
    
    const order = {
      id: (orders.length + 1).toString(),
      items,
      total,
      customerName: customerInfo.name,
      email: customerInfo.email,
      address: customerInfo.address,
      status: 'pending',
      date: new Date().toISOString()
    };
    
    orders.push(order);
    
    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Get single order
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

// Update order status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  order.status = status;
  res.json({ message: 'Order status updated', order });
});

export default router;