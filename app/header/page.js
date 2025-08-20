// 'use client'
// import {
//     IconBook,
//     IconChartPie3,
//     IconChevronDown,
//     IconCode,
//     IconCoin,
//     IconFingerprint,
//     IconNotification,
//     IconSun,
//     IconMoon,
// } from '@tabler/icons-react';
// import { useState, useEffect } from 'react';
// import {
//     Anchor,
//     Box,
//     Burger,
//     Button,
//     Center,
//     Collapse,
//     Divider,
//     Drawer,
//     Group,
//     HoverCard,
//     ScrollArea,
//     SimpleGrid,
//     Text,
//     ThemeIcon,
//     UnstyledButton,
//     useMantineTheme,
//     useMantineColorScheme,
//     ActionIcon,
// } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
// import classes from './HeaderMegaMenu.module.css';
// import { useRouter } from 'next/navigation';


// const collectionsData = [
//     {
//         id: 'trending-styles',
//         icon: IconCode,
//         title: 'Trending Styles',
//         description: 'Discover the latest fashion trends and styles',
//     },
//     {
//         id: 'exclusive-deals',
//         icon: IconCoin,
//         title: 'Exclusive Deals',
//         description: 'Get access to exclusive fashion deals and discounts',
//     },
//     {
//         id: 'fashion-guides',
//         icon: IconBook,
//         title: 'Fashion Guides',
//         description: 'Learn how to style your outfits like a pro',
//     },
//     // ... other collection items
// ];

// export default function HeaderMegaMenu() {
//     const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
//     const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
//     const theme = useMantineTheme();
//     const router = useRouter();
//     const { colorScheme, toggleColorScheme } = useMantineColorScheme();
//     const isDarkMode = colorScheme === 'dark';


//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//       setMounted(true);
//     }, []);
  
//     if (!mounted) return null;

//     const links = collectionsData.map((item) => (
//         <UnstyledButton 
//             className={classes.subLink} 
//             key={item.title}
//             onClick={() => router.push(`/collections/${item.id}`)}
//         >
//             <Group wrap="nowrap" align="flex-start">
//                 <ThemeIcon size={34} variant="default" radius="md">
//                     <item.icon size={22} color={theme.colors.blue[6]} />
//                 </ThemeIcon>
//                 <div>
//                     <Text size="sm" fw={500}>
//                         {item.title}
//                     </Text>
//                     <Text size="xs" c="dimmed">
//                         {item.description}
//                     </Text>
//                 </div>
//             </Group>
//         </UnstyledButton>
//     ));

//     return (
//         <Box>
//             <header className={classes.header}>
//                 <Group justify="space-between" h="100%">
//                     <MantineLogo size={30} />

//                     <Group h="100%" gap={0} visibleFrom="sm">
//                         <a href="#" className={classes.link}  onClick={() => { router.push('/') }}>
//                             Home
//                         </a>
//                         <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
//                             <HoverCard.Target>
//                                 <a href="#" className={classes.link}>
//                                     <Center inline>
//                                         <Box component="span" mr={5}>
//                                             Collections
//                                         </Box>
//                                         <IconChevronDown size={16} color={theme.colors.blue[6]} />
//                                     </Center>
//                                 </a>
//                             </HoverCard.Target>

//                             <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
//                                 <Group justify="space-between" px="md">
//                                     <Text fw={500}>Collections</Text>
//                                     <Anchor href="#" fz="xs">
//                                         View all
//                                     </Anchor>
//                                 </Group>

//                                 <Divider my="sm" />

//                                 <SimpleGrid cols={2} spacing={0}>
//                                     {links}
//                                 </SimpleGrid>

//                                 <div className={classes.dropdownFooter}>
//                                     <Group justify="space-between">
//                                         <div>
//                                             <Text fw={500} fz="sm">
//                                                 Start Shopping
//                                             </Text>
//                                             <Text size="xs" c="dimmed">
//                                                 Explore our exclusive collections and find your style
//                                             </Text>
//                                         </div>
//                                         <Button variant="default">Shop Now</Button>
//                                     </Group>
//                                 </div>
//                             </HoverCard.Dropdown>
//                         </HoverCard>
//                         <a href="#" className={classes.link}  onClick={() => { router.push('/cart') }}>
//                            Cart
//                         </a>
//                         <a href="#" className={classes.link} onClick={() => { router.push('/contact') }}>
//                             Contact Us
//                         </a>
//                     </Group>

//                     <Group visibleFrom="sm">
//                         <ActionIcon
//                             variant="outline"
//                             color={isDarkMode ? 'yellow' : 'blue'}
//                             onClick={() => toggleColorScheme()}
//                             title="Toggle color scheme"
//                         >
//                             {isDarkMode ? <IconSun size={18} /> : <IconMoon size={18} />}
//                         </ActionIcon>
//                         <Button onClick={() => { router.push('/login') }} variant="default">Log in</Button>
//                         <Button onClick={() => { router.push('/signup') }} >Sign up</Button>
//                     </Group>

//                     <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
//                 </Group>
//             </header>

//             <Drawer
//                 opened={drawerOpened}
//                 onClose={closeDrawer}
//                 size="100%"
//                 padding="md"
//                 title="Navigation"
//                 hiddenFrom="sm"
//                 zIndex={1000000}
//             >
//                 <ScrollArea h="calc(100vh - 80px)" mx="-md">
//                     <Divider my="sm" />

//                     <a href="#" className={classes.link}>
//                         Home
//                     </a>
//                     <UnstyledButton className={classes.link} onClick={toggleLinks}>
//                         <Center inline>
//                             <Box component="span" mr={5}>
//                                 Collections
//                             </Box>
//                             <IconChevronDown size={16} color={theme.colors.blue[6]} />
//                         </Center>
//                     </UnstyledButton>
//                     <Collapse in={linksOpened}>{links}</Collapse>
//                     <a href="#" className={classes.link}>
//                         Blog
//                     </a>
//                     <a href="#" className={classes.link} onClick={() => { router.push('/contact') }}>
//                         Contact Us
//                     </a>

//                     <Divider my="sm" />

//                     <Group justify="center" grow pb="xl" px="md">
//                         <Button variant="default">Log in</Button>
//                         <Button>Sign up</Button>
//                     </Group>
//                 </ScrollArea>
//             </Drawer>
//         </Box>
//     );
// }


'use client'
import {
    IconBook,
    IconChartPie3,
    IconChevronDown,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconNotification,
    IconSun,
    IconMoon,
    IconUser,
    IconLogout,
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import {
    Anchor,
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    HoverCard,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
    useMantineColorScheme,
    ActionIcon,
    Avatar,
    Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderMegaMenu.module.css';
import { useRouter } from 'next/navigation';
import { IconShoppingBag, IconHeart, IconStarFilled } from '@tabler/icons-react';
import { isValidToken, getUserId, logout } from '../authService'; // Adjust path as needed
import Cookies from 'js-cookie';

const collectionsData = [
    {
        id: 'trending-styles',
        icon: IconCode,
        title: 'Trending Styles',
        description: 'Discover the latest fashion trends and styles',
    },
    {
        id: 'exclusive-deals',
        icon: IconCoin,
        title: 'Exclusive Deals',
        description: 'Get access to exclusive fashion deals and discounts',
    },
    {
        id: 'fashion-guides',
        icon: IconBook,
        title: 'Fashion Guides',
        description: 'Learn how to style your outfits like a pro',
    },
    // ... other collection items
];

export default function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const router = useRouter();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        const loggedIn = isValidToken();
        setIsLoggedIn(loggedIn);
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        router.push('/');
    };

    if (!mounted) return null;

    const links = collectionsData.map((item) => (
        <UnstyledButton 
            className={classes.subLink} 
            key={item.title}
            onClick={() => router.push(`/collections/${item.id}`)}
        >
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <MantineLogo size={30} />

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <a href="#" className={classes.link}  onClick={() => { router.push('/') }}>
                            Home
                        </a>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Collections
                                        </Box>
                                        <IconChevronDown size={16} color={theme.colors.blue[6]} />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                                <Group justify="space-between" px="md">
                                    <Text fw={500}>Collections</Text>
                                    <Anchor href="#" fz="xs">
                                        View all
                                    </Anchor>
                                </Group>

                                <Divider my="sm" />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group justify="space-between">
                                        <div>
                                            <Text fw={500} fz="sm">
                                                Start Shopping
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                Explore our exclusive collections and find your style
                                            </Text>
                                        </div>
                                        <Button variant="default">Shop Now</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <a href="#" className={classes.link}  onClick={() => { router.push('/cart') }}>
                           Cart
                        </a>
                        <a href="#" className={classes.link} onClick={() => { router.push('/contact') }}>
                            Contact Us
                        </a>
                    </Group>

                    <Group visibleFrom="sm">
                        <ActionIcon
                            variant="outline"
                            color={isDarkMode ? 'yellow' : 'blue'}
                            onClick={() => toggleColorScheme()}
                            title="Toggle color scheme"
                        >
                            {isDarkMode ? <IconSun size={18} /> : <IconMoon size={18} />}
                        </ActionIcon>
                        
                        {isLoggedIn ? (
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <ActionIcon
                                        variant="subtle"
                                        size="lg"
                                        style={{ position: 'relative' }}
                                    >
                                        <Avatar 
                                            size="sm" 
                                            radius="xl" 
                                            color="blue"
                                        >
                                            <IconUser size={16} />
                                        </Avatar>
                                        {/* Green online indicator */}
                                        <Box
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                width: 12,
                                                height: 12,
                                                backgroundColor: 'green',
                                                borderRadius: '50%',
                                                border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`
                                            }}
                                        />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    {/* <Menu.Label>My Account</Menu.Label> */}
                                    {/* <Menu.Item 
                                        leftSection={<IconUser size={14} />}
                                        onClick={() => router.push('/profile')}
                                    >
                                        Profile
                                    </Menu.Item>
                                    <Menu.Item 
                                        leftSection={<IconShoppingBag size={14} />}
                                        onClick={() => router.push('/orders')}
                                    >
                                        My Orders
                                    </Menu.Item>
                                    <Menu.Divider /> */}
                                    <Menu.Item 
                                        color="red" 
                                        leftSection={<IconLogout size={14} />}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <>
                                <Button onClick={() => { router.push('/login') }} variant="default">Log in</Button>
                                <Button onClick={() => { router.push('/signup') }} >Sign up</Button>
                            </>
                        )}
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px)" mx="-md">
                    <Divider my="sm" />

                    <a href="#" className={classes.link} onClick={() => { router.push('/'); closeDrawer(); }}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Collections
                            </Box>
                            <IconChevronDown size={16} color={theme.colors.blue[6]} />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link} onClick={() => { router.push('/cart'); closeDrawer(); }}>
                        Cart
                    </a>
                    <a href="#" className={classes.link} onClick={() => { router.push('/contact'); closeDrawer(); }}>
                        Contact Us
                    </a>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        {isLoggedIn ? (
                            <Button 
                                variant="default" 
                                leftSection={<IconUser size={16} />}
                                onClick={() => { router.push('/profile'); closeDrawer(); }}
                            >
                                Profile
                            </Button>
                        ) : (
                            <>
                                <Button variant="default" onClick={() => { router.push('/login'); closeDrawer(); }}>
                                    Log in
                                </Button>
                                <Button onClick={() => { router.push('/signup'); closeDrawer(); }}>
                                    Sign up
                                </Button>
                            </>
                        )}
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}