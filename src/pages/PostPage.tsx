import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import {
    AppBar,
    Avatar,
    Box,
    styled,
    Toolbar,
    Typography
} from "@mui/material";

const drawerWidth = 340;

export default function PostPage() {
    // Mobile View Toggle
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const container = document.body ?? undefined;

    // Custom Styles for Toolbar
    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between"
    });

    // Custom Styles for Box to show user image
    const UserBox = styled(Box)(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: "10px"
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* Header for the page which shows menu button on smaller screen */}
            <AppBar position="fixed" sx={{ zIndex: 100002 }}>
                <StyledToolbar>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography sx={{ paddingTop: '3px' }} variant="h6" noWrap component="div">
                            Malar Ruban
                        </Typography>
                    </Box>
                    <UserBox>
                        <Avatar
                            sx={{ width: 30, height: 30 }}
                            src="https://media.licdn.com/dms/image/D4E03AQHz4EW6SP2zyg/profile-displayphoto-shrink_400_400/0/1667652268560?e=1684368000&v=beta&t=DqHZaOjOamq5YHaQGlR0lrxLXaRhAHLs4NkizwjSpgY"
                        />
                        <Typography variant="h6">Malar</Typography>
                    </UserBox>
                </StyledToolbar>
            </AppBar>
            {/* Responsive Sidebar Box which changes to drawer for mobile view */}
            <Box mt={6}
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders">
                {/* Mobile view Drawer */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        marginTop: '64px',
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Sidebar />
                </Drawer>
                {/* Permanent Drawer will be hidden on mobile view */}
                <Drawer variant="permanent" open sx={{ marginTop: '64px', display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }}>
                    <Sidebar />
                </Drawer>
            </Box>
            {/* Feed Box for the Post */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}            >
                <Feed />
            </Box>
        </Box>
    );
}
