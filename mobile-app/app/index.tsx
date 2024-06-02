import TasksScreen from '@/screens/Tasks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function Home() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <TasksScreen />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default Home;
