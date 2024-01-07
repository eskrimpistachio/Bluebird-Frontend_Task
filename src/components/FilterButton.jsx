import { useEffect } from 'react';

const FilterButton = ({
  category,
  setActive,
  active,
  setFilter,
  type,
  setHiddenCategory,
}) => {
  useEffect(() => {
    if (active === 0) {
      return;
    }
    const filtered = type.filter((t) => t.category_id === active);
    setFilter(filtered);
  }, [active]);

  //   console.log(type);

  return (
    <>
      <button
        className='hover:bg-white hover:text-cust-blue hover:rounded-lg '
        onClick={() => {
          setHiddenCategory(false);
          setActive(category.id);
        }}
        key={category.id}
      >
        <div className="flex flex-col">
          <img src={category.imageURL.replace(/ /g, '')} alt="image url" />
          <h1 className="text-center font-bold">{category.name}</h1>
        </div>
      </button>
    </>
  );
};

export default FilterButton;
