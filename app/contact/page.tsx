'use client'
import { useState } from 'react';
import {
  Container,
  Title,
  TextInput,
  Textarea,
  Button,
  Notification,
  SimpleGrid,
  Image,
  Text,
  Group,
  Divider,
  Box
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconX, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';
import classes from './ContactPage.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name is too short' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      message: (value) => (value.trim().length < 10 ? 'Message must be at least 10 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      console.log('Submitting:', values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setError(false);
      form.reset();
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="xl" py={60} className={classes.root}>
      <Title order={1} className={classes.mainTitle} ta="center" mb={10}>
        Get in Touch
      </Title>
      <Text c="dimmed" ta="center" mb={40} className={classes.subtitle}>
        We'd love to hear from you! Reach out for inquiries, feedback, or just to say hello.
      </Text>

      {submitted && (
        <Notification
          icon={<IconCheck size={18} />}
          color="teal"
          title="Thank you!"
          onClose={() => setSubmitted(false)}
          mb={30}
          className={classes.notification}
        >
          Your message has been sent successfully. Our team will get back to you soon.
        </Notification>
      )}

      {error && (
        <Notification
          icon={<IconX size={18} />}
          color="red"
          title="Error"
          onClose={() => setError(false)}
          mb={30}
          className={classes.notification}
        >
          Something went wrong. Please try again or contact us directly at support@addisfashion.com
        </Notification>
      )}

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
        <Box className={classes.contactForm}>
          <Title order={2} mb={30} className={classes.formTitle}>
            Send Us a Message
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Your Name"
              placeholder="Enter your full name"
              required
              radius="md"
              size="md"
              {...form.getInputProps('name')}
              mb={20}
              classNames={{ input: classes.input }}
            />

            <TextInput
              label="Email Address"
              placeholder="your@email.com"
              required
              radius="md"
              size="md"
              {...form.getInputProps('email')}
              mb={20}
              classNames={{ input: classes.input }}
            />

            <Textarea
              label="Your Message"
              placeholder="Type your message here..."
              required
              minRows={6}
              radius="md"
              size="md"
              {...form.getInputProps('message')}
              mb={30}
              classNames={{ input: classes.textarea }}
            />

            <Button
              type="submit"
              size="lg"
              radius="md"
              loading={isLoading}
              className={classes.submitButton}
            >
              Send Message
            </Button>
          </form>
        </Box>

        <Box className={classes.contactInfo}>
          <Title order={2} mb={30} className={classes.infoTitle}>
            Contact Information
          </Title>

          <Image
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
            alt="Fashion store"
            radius="md"
            mb={40}
            className={classes.contactImage}
          />

          <Group gap="lg" mb={30}>
            <IconMail size={28} className={classes.contactIcon} />
            <div>
              <Text fw={600} size="lg">Email Us</Text>
              <Text c="dimmed">support@addisfashion.com</Text>
            </div>
          </Group>

          <Group gap="lg" mb={30}>
            <IconPhone size={28} className={classes.contactIcon} />
            <div>
              <Text fw={600} size="lg">Call Us</Text>
              <Text c="dimmed">+1 (234) 567-8900</Text>
            </div>
          </Group>

          <Group gap="lg" mb={30}>
            <IconMapPin size={28} className={classes.contactIcon} />
            <div>
              <Text fw={600} size="lg">Visit Us</Text>
              <Text c="dimmed">123 Fashion Avenue, Addis Ababa, Ethiopia</Text>
            </div>
          </Group>

          <Divider my={30} />

          <Title order={3} mb={20}>Business Hours</Title>
          <Text mb={10}>Monday - Friday: 9:00 AM - 6:00 PM</Text>
          <Text>Saturday - Sunday: 10:00 AM - 4:00 PM</Text>
        </Box>
      </SimpleGrid>
    </Container>
  );
}