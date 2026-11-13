import {
  Button,
  bodyTextClass,
  eyebrowClass,
  Heading,
  mutedTextClass,
} from '../../src';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../src/primitives';

export function KitType() {
  return (
    <section className="flex flex-col gap-4">
      <p className={eyebrowClass}>Buttons and type</p>
      <Heading level={2} size="page">Page title</Heading>
      <Heading level={3} size="section">Section title</Heading>
      <Heading level={4}>Card title</Heading>
      <p className={`m-0 ${bodyTextClass}`}>Body text, as every screen uses it.</p>
      <p className={`m-0 ${mutedTextClass}`}>Muted text for hints and dates.</p>
      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button tone="secondary">Secondary</Button>
        <Button tone="quiet">Quiet</Button>
        <Button tone="danger">Danger</Button>
        <Button tone="link">Link</Button>
        <Button asChild tone="secondary">
          <a href="#top">A link as a button</a>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button tone="secondary">Dropdown menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab one</TabsTrigger>
          <TabsTrigger value="b">Tab two</TabsTrigger>
        </TabsList>
        <TabsContent value="a">First tab.</TabsContent>
        <TabsContent value="b">Second tab.</TabsContent>
      </Tabs>
    </section>
  );
}
