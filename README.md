# Markus Bike Shop - MVP Configurator

A product configuration system that allows salespeople in a physical store to create configurations with parts in real time, with automatic validation of compatibility rules and dynamic price calculation.

## 🚀 How to test the project locally
### 1. Clone the repository
```
> git clone https://github.com/antonioml/product-configuration-mvp.git
> cd product-configuration-mvp
```
### 2. Install dependencies
```
> npm install
```

### 3. Create .env file
Open the `.env.example.local` file and save it as `.env.local`
I'm leaving the keys here publicly since this is a technical test:
```
VITE_API_URL=https://rrtzndmefoetgfywjwca.supabase.co
VITE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydHpuZG1lZm9ldGdmeXdqd2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MjYyNDMsImV4cCI6MjA2NDEwMjI0M30.CMwrQ-_q6KZK4rVhRqRgTdsPNlTozcPc1k0otFtuuLY

```

### 4. Run the app
```
> npm run dev
```

### 5. Open your browser
In the terminal you can click directly on the localhost URL with the assigned port.

## 🎯 Understanding the Problem

### The business challenge
Markus Bike Shop needed to digitize their manual configuration process where:
- Salespeople used physical catalogs and paper
- Calculations were done by hand
- There was no automatic validation of compatibility and price changes
- The process was slow

#### Identified complexities:
1. **Compatibility rules**: Not all combinations are valid
2. **Dynamic pricing**: Prices can vary based on selected combinations
3. **Real-time experience**: Changes must be reflected instantly
4. **Future flexibility**: The system must adapt to new rules and common catalog changes, products, etc. that stores have without requiring drastic code changes.

### Research
#### MVP use case
- End user: the store employee
- Most used device: tablet or mobile since the employee accompanies the customer in the process

#### Competitor tools
Many online competitor stores have configurators:
- UI: we were inspired by a very simplified version, we don't need to see how the bike looks at all times for example.
- Actions: They let you save the configuration/project ID, to be able to load it at another time and you can also directly order that configuration as an online order or pick up in store.

## 🏗️ Architecture Decisions

### Chosen Technology Stack
Having good project scalability as a principle, I chose:
- **React**: flexible for making project structure decisions, reusable components, easily integrates with any backend when we need it
- **TypeScript**: safe typing for data, more maintainable code and development-time errors
- **Vite**: comes with reactjs + typescript template. Quick configuration and instant startup
- **Supabase**: PostgreSQL database, authentication, storage and REST API. Accelerated time-to-market: I don't need to develop backend from scratch
Can grow from MVP to production without changing platforms. Generous free plan for MVPs
- **Tailwind CSS**: rapid prototyping and design consistency
- **Zustand**: doesn't have Redux complexity but is more scalable than context 
- **Cursor**: with good AI usage I greatly accelerated development, it would have been impossible to do it in 8h

### Database
Supabase 
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   categories    │    │      items      │    │     rules       │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id              │    │ id              │    │ id              │
│ name            !    ┤ category        │    │ type            │
│ order           │    │ name            │    │ value (jsonb)   │
│ required        │    │ price           │    │ description     │
└─────────────────┘    │ image_url       │    │                 │
                       └─────────────────┘    └─────────────────┘

┌─────────────────┐ 
│ rule_conditions │   
├─────────────────┤ 
│ id              │    
│ rule_id         !    
│ item_id         │    
│ is_affected     │    
└─────────────────┘    
```                       

## Rule Engine Complexity:
- **Rules**: types `price_mod` (modify prices) and `allow` (compatibility restrictions)
- **Rules_Conditions**: connects the conditions to the rule. 
- **is_affected**: indicates if the item is affected by the rule or if it's just a condition for the rule to be fulfilled

### Adding a new rule
The rule engine works with two main tables:

1. **`rules`** - Defines the type and behavior of the rule
2. **`rule_conditions`** - Connects the rule with specific items

#### 📋 Available Rule Types

##### 1. **Price Rules (`price_mod`)**
Modify the price of an item when certain conditions are met.

**Structure:**
```json
{
  "type": "price_mod",
  "value": 20,  // Amount to add/subtract from the price
  "description": "A matte finish has price modifications for a full-suspension frame."
}
```

##### 2. **Compatibility Rules (`allow`)**
Restrictions that disable non-allowed combinations.

**Structure:**
```json
{
  "type": "allow",
  "value": false,  // false = not allowed
  "description": "Mountain Wheels cant combine with Diamond frame"
}
```

#### 🗃️ Why JSONB in the `value` field?

The `value` field is of type `JSONB` instead of a simple number or boolean for **scalability and future flexibility** reasons.

##### **Potential for Future Complex Rules:**

```json
// Example: Volume discount rule
{
  "type": "volume_discount",
  "value": {
    "thresholds": [
      { "min_items": 5, "discount_percent": 10 },
      { "min_items": 10, "discount_percent": 15 }
    ],
    "applies_to": ["premium_category"],
    "max_discount": 100
  }
}

```

Once you add this type of rule, you need to implement the logic in the `useRuleEngine.ts` hook code.

### Testing the rule conditions
Try configuring these examples to match a rule.

#### **Example 1: Rule price_mod**
```
Frame: Full-suspension (130€)
Finish: Matte 50€ (30€ normal + 20€ rule condition)
Wheels: Fat wheels (150€)
Rim: Black (20€)
Chain: Single-speed (43€)
Seat: Black seat (20€)
Total: 413€ ✅

```
#### **Example 2: Rule allow**
Click on Diamond Frame or Step-through and you'll see how Mountain Wheels becomes disabled.
If you click on Mountain Wheels, both Diamond Frame and Step-through will become disabled as well.
```
Mountain Wheels cant combine with Diamond frame
Mountain wheels cant combine with Step-through frame

```

#### **Example 3: Rule allow**
Click on Fat bike wheels and you'll see how Red Rim becomes disabled.
```
Fat bike wheels not being available in red

```

### Implemented Design Patterns
- Hooks: Business logic
- Stores: Global state
- Services: Data access
- Models: Type definitions

Single Responsibility: Each file has a purpose
DRY: Reusable logic in hooks
Type Safety: TypeScript in all layers

#### **Component Composition**
```typescript
<ItemSelector> 
  └── <ItemOption />
  └── <HeaderNumber />
```

## 🤔 Considerations and Trade-offs

### MVP Decisions
**I prioritized:**
- ✅ Robust core functionality
- ✅ Scalable architecture
- ✅ Developer experience

**What I left out:**
- 🔄 Better implementation of the flexible rule system
- 🔄 Features: generate config id "MK34034" and be able to load it to restore it, search for configuration options when there are many, etc.
- 🔄 Testing
- 🔄 User action confirmations: "are you sure you want to reset the configuration?", "do you want to remove this product from the config?"
- 🔄 More decoupled, so it can be inserted as a configurator module in a future online store for example and the button would be add to cart or pick up in store
- 🔄 Performance optimizations
- 🔄 Internationalization
- 🔄 Interface: better display rule description to the user, each product in the configuration can be expanded in detail to show it to the customer.
- 🔄 Improve class rendering. Use of some lib like `classnames`

## 👨‍💻 Author

**Antonio Morales**  
Product Engineer

---

*This project was developed as a technical test in ~10 hours and also using AI to improve productivity, prioritizing solid architecture and core functionality over advanced features.*
