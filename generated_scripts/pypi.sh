# Auto-generated script for PyPI
# Generated from: pypi.md
# Mirror ID: pypi

check() {
	has_command pip || has_command pdm || has_command uv
}

_pypi_install_1() {
	# Test and execute
	# Test conditions
	has_command pip || {
		print_warning "Test condition failed: has_command pip"
	}

	# Execute commands
	pip config get global.index-url 2>/dev/null > ${_backup_dir}/pip.bak
	pip config set global.index-url "https://$domain/pypi/web/simple/"

	return 0
}

_pypi_install_2() {
	# Test and execute
	backup_path="${_backup_dir}"

	# Test conditions
	has_command pdm || {
		print_warning "Test condition failed: has_command pdm"
	}

	# Execute commands
	pdm config pypi.url 2>/dev/null > $backup_path/pdm.bak
	pdm config global.index-url https://$domain/pypi/web/simple/

	return 0
}

_pypi_install_3() {
	# Test and execute
	set_sudo

	backup_path="${_backup_dir}"

	# Test conditions
	has_command uv || {
		print_warning "Test condition failed: has_command uv"
	}

	# Execute commands
	$sudo mkdir -p /etc/uv
	if [ ! -f /etc/uv/uv.toml ]; then
	$sudo touch /etc/uv/uv.toml
	else
	$sudo cp /etc/uv/uv.toml $backup_path/uv.bak
	fi
	$sudo tee -a /etc/uv/uv.toml > /dev/null << EOF
[[index]]
url = "https://$domain"
default = true
EOF

	return 0
}

install() {

	_pypi_install_1 || return 1
	_pypi_install_2 || return 1
	_pypi_install_3 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."


	# Execute recovery commands
	last_url=$(cat "$_backup_dir/pip.bak") 2>/dev/null || true
	pip config set global.index-url "$last_url" 2>/dev/null || true
	last_url=$(cat "$_backup_dir/pdm.bak") 2>/dev/null || true
	pdm config pypi.url "$last_url" 2>/dev/null || true
	rm /etc/uv/uv.toml 2>/dev/null || true
	cp $_backup_dir/uv.bak /etc/uv/uv.toml 2>/dev/null || true

	print_success "Recovery completed"
}
