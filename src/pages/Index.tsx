import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Bulldozer {
  id: number;
  model: string;
  image: string;
  power: number;
  year: number;
  weight: number;
  category: string;
}

const bulldozers: Bulldozer[] = [
  {
    id: 1,
    model: 'CAT D11T',
    image: 'https://cdn.poehali.dev/projects/78c0e5e1-26f7-442e-a7e9-6bbeee0b2a6b/files/ed2c7066-5b67-442e-8cd7-8f92641bed41.jpg',
    power: 850,
    year: 2024,
    weight: 104300,
    category: 'Тяжелый'
  },
  {
    id: 2,
    model: 'Komatsu D475A',
    image: 'https://cdn.poehali.dev/projects/78c0e5e1-26f7-442e-a7e9-6bbeee0b2a6b/files/f5f9a99e-f773-4592-9ea6-f0738d8f42a2.jpg',
    power: 890,
    year: 2023,
    weight: 108000,
    category: 'Тяжелый'
  },
  {
    id: 3,
    model: 'John Deere 1050K',
    image: 'https://cdn.poehali.dev/projects/78c0e5e1-26f7-442e-a7e9-6bbeee0b2a6b/files/dc8402f6-52b2-4e10-a28d-dbf02b6561ef.jpg',
    power: 310,
    year: 2024,
    weight: 37200,
    category: 'Средний'
  },
  {
    id: 4,
    model: 'CAT D6T',
    image: 'https://cdn.poehali.dev/projects/78c0e5e1-26f7-442e-a7e9-6bbeee0b2a6b/files/ed2c7066-5b67-442e-8cd7-8f92641bed41.jpg',
    power: 215,
    year: 2023,
    weight: 21500,
    category: 'Средний'
  },
  {
    id: 5,
    model: 'Komatsu D85',
    image: 'https://cdn.poehali.dev/projects/78c0e5e1-26f7-442e-a7e9-6bbeee0b2a6b/files/f5f9a99e-f773-4592-9ea6-f0738d8f42a2.jpg',
    power: 264,
    year: 2022,
    weight: 28400,
    category: 'Средний'
  },
  {
    id: 6,
    model: 'John Deere 450K',
    image: 'https://cdn.poehali.dev/projects/78c0e5e1-26f7-442e-a7e9-6bbeee0b2a6b/files/dc8402f6-52b2-4e10-a28d-dbf02b6561ef.jpg',
    power: 90,
    year: 2024,
    weight: 8900,
    category: 'Легкий'
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedPower, setSelectedPower] = useState<string>('all');

  const filteredBulldozers = bulldozers.filter((bulldozer) => {
    if (selectedCategory !== 'all' && bulldozer.category !== selectedCategory) return false;
    if (selectedYear !== 'all' && bulldozer.year.toString() !== selectedYear) return false;
    if (selectedPower !== 'all') {
      if (selectedPower === 'low' && bulldozer.power > 200) return false;
      if (selectedPower === 'medium' && (bulldozer.power <= 200 || bulldozer.power > 500)) return false;
      if (selectedPower === 'high' && bulldozer.power <= 500) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Icon name="Construction" size={48} className="text-primary" />
            Бульдозеры
          </h1>
          <p className="text-xl text-muted-foreground">Каталог тяжелой техники</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-4 justify-center animate-fade-in">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px] bg-card border-border">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              <SelectItem value="Легкий">Легкий</SelectItem>
              <SelectItem value="Средний">Средний</SelectItem>
              <SelectItem value="Тяжелый">Тяжелый</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[200px] bg-card border-border">
              <SelectValue placeholder="Год выпуска" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все годы</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPower} onValueChange={setSelectedPower}>
            <SelectTrigger className="w-[200px] bg-card border-border">
              <SelectValue placeholder="Мощность" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любая мощность</SelectItem>
              <SelectItem value="low">До 200 л.с.</SelectItem>
              <SelectItem value="medium">200-500 л.с.</SelectItem>
              <SelectItem value="high">Более 500 л.с.</SelectItem>
            </SelectContent>
          </Select>

          {(selectedCategory !== 'all' || selectedYear !== 'all' || selectedPower !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedYear('all');
                setSelectedPower('all');
              }}
              className="border-border hover:bg-secondary"
            >
              <Icon name="X" size={16} className="mr-2" />
              Сбросить фильтры
            </Button>
          )}
        </div>

        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            Найдено: <span className="text-primary font-semibold">{filteredBulldozers.length}</span> моделей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBulldozers.map((bulldozer, index) => (
            <Card
              key={bulldozer.id}
              className="bg-card border-border overflow-hidden hover:scale-105 transition-transform duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={bulldozer.image}
                  alt={bulldozer.model}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  {bulldozer.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">{bulldozer.model}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Gauge" size={20} className="text-primary" />
                    <span>Мощность: <span className="text-foreground font-semibold">{bulldozer.power} л.с.</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Calendar" size={20} className="text-primary" />
                    <span>Год: <span className="text-foreground font-semibold">{bulldozer.year}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Weight" size={20} className="text-primary" />
                    <span>Вес: <span className="text-foreground font-semibold">{(bulldozer.weight / 1000).toFixed(1)} т</span></span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Icon name="Info" size={16} className="mr-2" />
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBulldozers.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры фильтров</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
