import os
import sys
import zipfile

def make_zip(output_path):
    exclude_dirs = {'node_modules', '.git', 'dist', '.cache', '__pycache__', '.vite'}
    exclude_files = {'kumago-project-code.zip', os.path.basename(output_path)}

    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk('.'):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for file in files:
                if file in exclude_files or file.endswith('.pyc'):
                    continue
                filepath = os.path.join(root, file)
                arcname = os.path.relpath(filepath, '.')
                zipf.write(filepath, arcname)

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else 'kumago-project-code.zip'
    make_zip(out)
