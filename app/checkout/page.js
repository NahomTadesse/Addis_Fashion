"use client";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Paper,
  Stack,
  Divider,
  TextInput,
  Radio,
  SimpleGrid,
  Loader,
  Alert,
  Box
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconArrowLeft, IconCircleCheck } from '@tabler/icons-react';
import classes from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'Ethiopia',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const goBack = () => {
    router.back();
  };

  if (success) {
    return (
      <Container size="md" py={40}>
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Stack align="center" gap="xl">
            <IconCircleCheck size={60} color="var(--mantine-color-teal-6)" />
            <Title order={2}>Order Confirmed!</Title>
            <Text size="xl" ta="center">
              Thank you for your purchase. Your order has been received and is being processed.
            </Text>
            <Text size="lg" ta="center" c="dimmed">
              A confirmation email has been sent to {formData.email}
            </Text>
            <Button 
              size="lg" 
              mt="md" 
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="xl" py={40}>
      <Button 
        variant="subtle" 
        leftSection={<IconArrowLeft size={18} />} 
        onClick={goBack}
        mb="xl"
      >
        Back to cart
      </Button>
      
      <Title order={1} mb={30}>Checkout</Title>
      
      <form onSubmit={handleSubmit}>
        <Group align="flex-start" gap="xl" wrap="nowrap">
          <Paper shadow="sm" p="md" radius="md" withBorder className={classes.checkoutForm}>
            <Stack gap="xl">
              <Box>
                <Title order={3} mb="md">Shipping Information</Title>
                <SimpleGrid cols={2}>
                  <TextInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <TextInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </SimpleGrid>
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  mt="md"
                />
                <TextInput
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  mt="md"
                />
                <TextInput
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  mt="md"
                />
                <SimpleGrid cols={2} mt="md">
                  <TextInput
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                  <TextInput
                    label="ZIP Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </SimpleGrid>
                <TextInput
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled
                  mt="md"
                />
              </Box>

              <Box>
                <Title order={3} mb="md">Payment Method</Title>
                <Radio.Group
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                >
                  <Stack mt="xs">
                    <Radio value="credit" label="Credit/Debit Card" />
                    <Radio value="mobile" label="Mobile Payment" />
                    <Radio value="cash" label="Cash on Delivery" />
                  </Stack>
                </Radio.Group>

                {paymentMethod === 'credit' && (
                  <Box mt="md">
                    <TextInput
                      label="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <SimpleGrid cols={2} mt="md">
                      <TextInput
                        label="Expiry Date"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                      />
                      <TextInput
                        label="CVC"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="123"
                        required
                      />
                    </SimpleGrid>
                  </Box>
                )}

                {paymentMethod === 'mobile' && (
                  <Alert color="blue" mt="md">
                    You'll be redirected to your mobile payment app to complete the transaction.
                  </Alert>
                )}

                {paymentMethod === 'cash' && (
                  <Alert color="green" mt="md">
                    Pay with cash when your order is delivered.
                  </Alert>
                )}
              </Box>
            </Stack>
          </Paper>

          <Paper shadow="sm" p="md" radius="md" withBorder className={classes.orderSummary}>
            <Title order={3} mb="md">Order Summary</Title>
            
            <Stack gap="sm">
              <Group justify="space-between">
                <Text>Subtotal</Text>
                <Text>1000.00 ETB</Text>
              </Group>
              
              <Group justify="space-between">
                <Text>Shipping</Text>
                <Text>Free</Text>
              </Group>
              
              <Group justify="space-between">
                <Text>Tax (8%)</Text>
                <Text>80.00 ETB</Text>
              </Group>
              
              <Divider my="sm" />
              
              <Group justify="space-between" fw={700}>
                <Text size="lg">Total</Text>
                <Text size="lg">1080.00 ETB</Text>
              </Group>
              
              <Button 
                type="submit"
                size="lg" 
                mt="md"
                disabled={loading}
              >
                {loading ? <Loader size="sm" color="white" /> : 'Place Order'}
              </Button>
              
              <Text c="dimmed" size="sm" mt="sm">
                By placing your order, you agree to our Terms and Conditions
              </Text>
            </Stack>
          </Paper>
        </Group>
      </form>
    </Container>
  );
}