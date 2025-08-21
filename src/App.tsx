import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Code,
  IconButton,
  Clipboard,
} from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";

const transKey = (note: string): number => {
  const noteList = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const keyPattern = /[A-Z]#?/;
  const matchKey = (keyPattern.exec(note) ?? ["C"])[0];
  const key = noteList.findIndex((e) => e === matchKey);
  const octave = Number(note.replace(matchKey, "")) * 12;
  const base = 5 + 12 * 4;
  return Math.pow(2, (key + octave - base - 1) / 12);
};

interface WhiteKeyProps {
  noteName?: string;
  onClick: () => void;
}

const WhiteKey = ({ noteName, onClick, ...props }: WhiteKeyProps) => (
  <Box
    w="25px"
    h="100px"
    bg="white"
    border="1px solid"
    borderColor="gray.200"
    _active={{ bg: "gray.200", transform: "translateY(1px)" }}
    transition="all 0.05s ease-in-out"
    display="flex"
    flexDir="column"
    justifyContent="flex-end"
    alignItems="center"
    pb={1}
    cursor="pointer"
    onClick={onClick}
    {...props}
  >
    {noteName && (
      <Text fontWeight="bold" color="gray.500" userSelect="none">
        {noteName}
      </Text>
    )}
  </Box>
);

interface BlackKeyProps {
  onClick: () => void;
  left: string;
}

const BlackKey = ({ onClick, ...props }: BlackKeyProps) => (
  <Box
    w="20px"
    h="60px"
    bg="black"
    border="1px solid"
    borderColor="black"
    boxShadow="xs"
    position="absolute"
    zIndex={10}
    transform="translateX(-50%)"
    _active={{ bg: "gray.800", h: "58px" }}
    transition="all 0.05s ease-in-out"
    cursor="pointer"
    onClick={onClick}
    {...props}
  />
);

interface PianoProps {
  octave?: number;
  onKeyPress: (note: number) => void;
}

const Piano = ({ octave = 4, onKeyPress }: PianoProps) => {
  const whiteKeyWidth = 25;
  const whiteKeyNotes = ["C", "D", "E", "F", "G", "A", "B"];
  const blackKeyNotes = ["C#", "D#", "F#", "G#", "A#"];
  const blackKeyPositions = [0, 1, 3, 4, 5];

  return (
    <Flex position="relative" w="fit-content" borderColor="gray.400">
      {/* --- 白鍵 --- */}
      {whiteKeyNotes.map((note) => {
        const fullNote = `${note}${String(octave)}`;
        return (
          <WhiteKey
            key={fullNote}
            noteName={note === "C" ? fullNote : undefined}
            onClick={() => {
              onKeyPress(transKey(fullNote));
            }}
          />
        );
      })}

      {/* --- 黒鍵 --- */}
      {blackKeyPositions.map((whiteKeyIndex, i) => {
        const fullNote = `${blackKeyNotes[i]}${String(octave)}`;
        return (
          <BlackKey
            key={fullNote}
            left={`${String((whiteKeyIndex + 1) * whiteKeyWidth)}px`}
            onClick={() => {
              onKeyPress(transKey(fullNote));
            }}
          />
        );
      })}
    </Flex>
  );
};

function App() {
  const [activeKey, setActiveKey] = useState("");
  const handleKeyPress = (note: number) => {
    setActiveKey(note.toString());
  };
  return (
    <Provider>
      <Flex
        direction="column"
        h="100vh"
        justify="center"
        align="center"
        bg="gray.100"
      >
        <Heading size="5xl" mb={12} h="60px" color="teal.500">
          <Clipboard.Root value={activeKey}>
            <Clipboard.Trigger asChild>
              <IconButton variant="surface" size="xs">
                <Code size="lg">{activeKey}</Code>
                <Clipboard.Indicator />
              </IconButton>
            </Clipboard.Trigger>
          </Clipboard.Root>
        </Heading>
        <Flex
          w="fit-content"
          border="2px solid"
          borderColor="gray.400"
          overflow="hidden"
          borderRadius="xl"
          boxShadow="md"
          margin="4px"
        >
          <Piano octave={1} onKeyPress={handleKeyPress} />
          <Piano octave={2} onKeyPress={handleKeyPress} />
        </Flex>
        <Flex
          w="fit-content"
          border="2px solid"
          borderColor="gray.400"
          overflow="hidden"
          borderRadius="xl"
          boxShadow="md"
          margin="4px"
        >
          <Piano octave={3} onKeyPress={handleKeyPress} />
          <Piano octave={4} onKeyPress={handleKeyPress} />
        </Flex>
        <Flex
          w="fit-content"
          border="2px solid"
          borderColor="gray.400"
          overflow="hidden"
          borderRadius="xl"
          boxShadow="md"
          margin="4px"
        >
          <Piano octave={5} onKeyPress={handleKeyPress} />
          <Piano octave={6} onKeyPress={handleKeyPress} />
        </Flex>
        <Flex
          w="fit-content"
          border="2px solid"
          borderColor="gray.400"
          overflow="hidden"
          borderRadius="xl"
          boxShadow="md"
          margin="4px"
        >
          <Piano octave={7} onKeyPress={handleKeyPress} />
          <Piano octave={8} onKeyPress={handleKeyPress} />
        </Flex>
        <Flex
          w="fit-content"
          border="2px solid"
          borderColor="gray.400"
          overflow="hidden"
          borderRadius="xl"
          boxShadow="md"
          margin="4px"
        >
          <Piano octave={9} onKeyPress={handleKeyPress} />
          <Piano octave={10} onKeyPress={handleKeyPress} />
        </Flex>
      </Flex>
    </Provider>
  );
}

export default App;
