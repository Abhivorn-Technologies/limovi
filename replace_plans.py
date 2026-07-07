import re

with open(r'd:\limovi\sections\AccessStrategies.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the tables with the bulleted list stacked format
def replace_func(match):
    table_str = match.group(0)
    
    # Extract rows
    rows = re.findall(r'<tr>(.*?)</tr>', table_str, re.DOTALL)
    
    list_items = []
    for row in rows:
        # Extract the label (td 2) and value (td 3)
        cols = re.findall(r'<td.*?>(.*?)</td>', row, re.DOTALL)
        if len(cols) == 3:
            label = cols[1]
            value = cols[2]
            
            # Create list item
            list_items.append(f"""            <li>
              <div className="font-bold text-white">{label.strip()}</div>
              <div className="text-slate-400 mt-0.5">{value.strip()}</div>
            </li>""")
    
    items_str = '\n'.join(list_items)
    
    return f"""<ul className="list-disc list-outside ml-4 mt-2 space-y-2.5 text-xs">
{items_str}
          </ul>"""

new_content = re.sub(r'<div className="mt-2 text-xs w-full">\s*<table.*?>\s*<tbody>.*?</tbody>\s*</table>\s*</div>', replace_func, content, flags=re.DOTALL)

with open(r'd:\limovi\sections\AccessStrategies.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done replacing.")
