import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Recipe {
  name: string;
  baseVolume: number;
  ingredients: Ingredient[];
  note?: string;
}

const recipes: Recipe[] = [
  {
    name: "Podstawowy (uniwersalny)",
    baseVolume: 10,
    ingredients: [
      { name: "Saletra wapniowa (Ca(NO₃)₂)", amount: 25, unit: "g" },
      { name: "Siarczan magnezu (MgSO₄)", amount: 10, unit: "g" },
      { name: "Fosforan monopotasowy (KH₂PO₄)", amount: 15, unit: "g" },
      { name: "Azotan potasowy (KNO₃)", amount: 20, unit: "g" },
      { name: "Chelat żelaza (Fe-EDTA 13%)", amount: 5, unit: "ml" },
      { name: "Roztwór mikroelementów", amount: 2, unit: "ml" },
    ],
    note: "Nie mieszaj saletr wapniowej bezpośrednio z siarczanem magnezu"
  },
  {
    name: "Łatwy (zioła i sałata)",
    baseVolume: 5,
    ingredients: [
      { name: "Nawóz wieloskładnikowy NPK 20-20-20", amount: 15, unit: "g" },
      { name: "Siarczan magnezu (sól Epsom)", amount: 5, unit: "g" },
      { name: "Chelat żelaza", amount: 2, unit: "ml" },
    ],
    note: "Najprostsza opcja dla początkujących"
  },
  {
    name: "Pomidory i warzywa owocowe",
    baseVolume: 10,
    ingredients: [
      { name: "Saletra wapniowa (Ca(NO₃)₂)", amount: 30, unit: "g" },
      { name: "Azotan potasowy (KNO₃)", amount: 25, unit: "g" },
      { name: "Fosforan monopotasowy (KH₂PO₄)", amount: 20, unit: "g" },
      { name: "Siarczan magnezu (MgSO₄)", amount: 12, unit: "g" },
      { name: "Chelat żelaza", amount: 6, unit: "ml" },
      { name: "Mikroelementy", amount: 3, unit: "ml" },
    ],
    note: "Zwiększone stężenie K i P dla obfitego owocowania"
  },
  {
    name: "Truskawki",
    baseVolume: 5,
    ingredients: [
      { name: "Saletra wapniowa", amount: 12, unit: "g" },
      { name: "Siarczan potasowy (K₂SO₄)", amount: 10, unit: "g" },
      { name: "Fosforan monopotasowy (KH₂PO₄)", amount: 8, unit: "g" },
      { name: "Siarczan magnezu", amount: 6, unit: "g" },
      { name: "Chelat żelaza", amount: 4, unit: "ml" },
      { name: "Mikroelementy", amount: 2, unit: "ml" },
    ],
    note: "EC 1.8-2.2 mS/cm, pH 5.8-6.2"
  },
  {
    name: "Masterblend (profesjonalny)",
    baseVolume: 3.8,
    ingredients: [
      { name: "Masterblend 4-18-38", amount: 12, unit: "g" },
      { name: "Siarczan magnezu (sól Epsom)", amount: 12, unit: "g" },
      { name: "Saletra wapniowa (Ca(NO₃)₂)", amount: 12, unit: "g" },
    ],
    note: "Dodaj A+B razem, potem osobno C"
  },
  {
    name: "Organiczny (kompost)",
    baseVolume: 10,
    ingredients: [
      { name: "Kompost/humus", amount: 200, unit: "g" },
      { name: "Nawóz rybny lub z glonów", amount: 50, unit: "ml" },
      { name: "Melasa", amount: 15, unit: "ml" },
    ],
    note: "Zamocz kompost w woreczku z gazy na 24-48h"
  },
  {
    name: "Rośliny ozdobne",
    baseVolume: 5,
    ingredients: [
      { name: "Nawóz NPK 20-20-20", amount: 8, unit: "g" },
      { name: "Siarczan magnezu", amount: 3, unit: "g" },
      { name: "Chelat żelaza", amount: 2, unit: "ml" },
      { name: "Ekstrakt z wodorostów (opcjonalnie)", amount: 5, unit: "ml" },
    ],
    note: "EC 1.0-1.5 mS/cm (niższe niż dla warzyw)"
  },
];

export const NutrientCalculator = () => {
  const [volume, setVolume] = useState<string>("10");
  const [selectedRecipe, setSelectedRecipe] = useState<string>("0");

  const recipe = recipes[parseInt(selectedRecipe)];
  const volumeNum = parseFloat(volume) || 0;
  const multiplier = volumeNum / recipe.baseVolume;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Kalkulator składników odżywczych
        </CardTitle>
        <CardDescription>
          Wpisz objętość wody, wybierz przepis, a aplikacja obliczy dokładne ilości składników
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="volume">Objętość wody (litry)</Label>
            <Input
              id="volume"
              type="number"
              min="0.1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recipe">Typ przepisu</Label>
            <Select value={selectedRecipe} onValueChange={setSelectedRecipe}>
              <SelectTrigger id="recipe">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {recipes.map((recipe, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {recipe.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {volumeNum > 0 && (
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-lg">
                Składniki dla {volumeNum}L wody:
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => {
                  const calculatedAmount = (ingredient.amount * multiplier).toFixed(2);
                  const displayAmount = parseFloat(calculatedAmount);
                  
                  return (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span>
                        <strong className="text-foreground">
                          {displayAmount} {ingredient.unit}
                        </strong>{" "}
                        <span className="text-muted-foreground">{ingredient.name}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              
              {recipe.note && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-sm">
                  <strong>⚠️ Ważne:</strong> {recipe.note}
                </div>
              )}
            </div>

            <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
              <h4 className="font-semibold">Podstawowe parametry:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• pH docelowe: 5.5-6.5</li>
                <li>• EC: 1.5-2.5 mS/cm (zależnie od rośliny)</li>
                <li>• Temperatura: 18-24°C</li>
                <li>• Wymiana roztworu: co 2-3 tygodnie</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
