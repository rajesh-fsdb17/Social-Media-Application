import { ModeToggle } from '@/components/mode-toggle';
import { Container, Flex, Text } from '@radix-ui/themes';
import { GiButterfly } from "react-icons/gi";
import { useLocation } from 'react-router-dom';
import { SlideTabsExample } from './SlideTabs'; // Import the SlideTabs component
import StaggeredDropDown from './StaggeredDropdown';
const NavBar = () => {
  const location = useLocation();
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex align="center" gap="3" justify="between">
          <Flex direction="row" gap="1">
            <GiButterfly size='25' />
            <Text className="font-playwrite font-semibold text-2xl">FeedSpot</Text>
          </Flex>
          <SlideTabsExample />
          <ModeToggle/>
          <StaggeredDropDown/>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;
