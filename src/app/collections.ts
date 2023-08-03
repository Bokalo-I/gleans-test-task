export interface ICollection {
  id: string;
  category: string;
  isAdded: boolean;
  name: string;
}

export interface ICategory {
  name: string;
  isAdded: boolean;
}

export const collections: ICollection[] = [
  { id: '1', name: 'Football', isAdded: false, category: 'Sport' },
  { id: '2', name: 'Basketball', isAdded: false, category: 'Sport' },
  { id: '3', name: 'Tennis', isAdded: false, category: 'Sport' },
  { id: '4', name: 'Soccer', isAdded: false, category: 'Sport' },
  { id: '5', name: 'Baseball', isAdded: false, category: 'Sport' },
  { id: '6', name: 'Volleyball', isAdded: false, category: 'Sport' },
  { id: '7', name: 'Swimming', isAdded: false, category: 'Sport' },
  { id: '8', name: 'Golf', isAdded: false, category: 'Sport' },
  { id: '9', name: 'Hockey', isAdded: false, category: 'Sport' },
  { id: '10', name: 'Cricket', isAdded: false, category: 'Sport' },
  { id: '11', name: 'Chess', isAdded: false, category: 'Game' },
  { id: '12', name: 'Checkers', isAdded: false, category: 'Game' },
  { id: '13', name: 'Monopoly', isAdded: false, category: 'Game' },
  { id: '14', name: 'Scrabble', isAdded: false, category: 'Game' },
  { id: '15', name: 'Uno', isAdded: false, category: 'Game' },
  { id: '16', name: 'Dominoes', isAdded: false, category: 'Game' },
  { id: '17', name: 'Poker', isAdded: false, category: 'Game' },
  { id: '18', name: 'Bridge', isAdded: false, category: 'Game' },
  { id: '19', name: 'Dancing', isAdded: false, category: 'Hobby' },
  { id: '20', name: 'Painting', isAdded: false, category: 'Hobby' },
  { id: '21', name: 'Photography', isAdded: false, category: 'Hobby' },
  { id: '22', name: 'Cooking', isAdded: false, category: 'Hobby' },
  { id: '23', name: 'Reading', isAdded: false, category: 'Hobby' },
  { id: '24', name: 'Writing', isAdded: false, category: 'Hobby' },
  { id: '25', name: 'Gardening', isAdded: false, category: 'Hobby' },
  { id: '26', name: 'Fishing', isAdded: false, category: 'Hobby' },
  { id: '27', name: 'Running', isAdded: false, category: 'Fitness' },
  { id: '28', name: 'Yoga', isAdded: false, category: 'Fitness' },
  { id: '29', name: 'Cycling', isAdded: false, category: 'Fitness' },
  { id: '30', name: 'Hiking', isAdded: false, category: 'Fitness' },
  { id: '31', name: 'Movies', isAdded: false, category: 'Entertainment' },
  { id: '32', name: 'Music', isAdded: false, category: 'Entertainment' },
  { id: '33', name: 'Games', isAdded: false, category: 'Entertainment' },
  { id: '34', name: 'Concerts', isAdded: false, category: 'Entertainment' },
  { id: '35', name: 'Travel', isAdded: false, category: 'Adventure' },
  { id: '36', name: 'Nature', isAdded: false, category: 'Adventure' },
  { id: '37', name: 'Beach', isAdded: false, category: 'Adventure' },
  { id: '38', name: 'Mountains', isAdded: false, category: 'Adventure' },
  { id: '39', name: 'Science', isAdded: false, category: 'Education' },
  { id: '40', name: 'History', isAdded: false, category: 'Education' },
  { id: '41', name: 'Mathematics', isAdded: false, category: 'Education' },
  { id: '42', name: 'Biology', isAdded: false, category: 'Education' },
  { id: '43', name: 'Physics', isAdded: false, category: 'Education' },
  { id: '44', name: 'Art', isAdded: false, category: 'Education' },
  { id: '45', name: 'Technology', isAdded: false, category: 'Education' },
  { id: '46', name: 'Languages', isAdded: false, category: 'Education' },
  { id: '47', name: 'Coding', isAdded: false, category: 'Education' },
  { id: '48', name: 'Business', isAdded: false, category: 'Career' },
  { id: '49', name: 'Finance', isAdded: false, category: 'Career' },
  { id: '50', name: 'Entrepreneurship', isAdded: false, category: 'Career' },
];

export const sortCollections = (collections: ICollection[]) =>
  [...collections].sort((a, b) => {
    if (a.isAdded === b.isAdded) {
      return a.name.localeCompare(b.category);
    }
    return a.isAdded ? -1 : 1;
  });

export const initialCategories: ICategory[] = collections
  .map(({ category }) => category)
  .filter((value, index, self) => self.indexOf(value) === index)
  .map((category) => ({ name: category, isAdded: false }));
